using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs.User;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.User
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public UserService(UserManager<AppUser> userManager, IMapper mapper, IFileService fileService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _fileService = fileService;
        }
        
        public async Task<ServiceResponse> CreateAsync(UserCreateDto dto)
        {
            if (!await UniqueEmailAsync(dto.Email))
                return new ServiceResponse("Êîðèñòóâà÷ ³ç òàêèì email âæå ³ñíóº");

            if (!await UniqueUserNameAsync(dto.UserName))
                return new ServiceResponse("Êîðèñòóâà÷ ³ç òàêèì ³ì'ÿì âæå ³ñíóº");


            var entity = _mapper.Map<AppUser>(dto);

            if (dto.Image != null)
            {
                var imageName = await _fileService.SaveImageAsync(dto.Image, Settings.AvatarsPath);
                if (!string.IsNullOrEmpty(imageName))
                {
                    entity.Image = imageName;
                }
            }
            
            var result = await _userManager.CreateAsync(entity, dto.Password);
            if (!result.Succeeded)
                return new ServiceResponse(result.Errors.First().Description);

            result = await _userManager.AddToRolesAsync(entity, dto.Roles);
            if (!result.Succeeded)
                return new ServiceResponse(result.Errors.First().Description);

            return new ServiceResponse("Êîðèñòóâà÷à óñï³øíî ñòâîðåíî", true);
        }

        public async Task<ServiceResponse> UpdateAsync(UserUpdateDto dto)
        {
            var entity = await _userManager.FindByIdAsync(dto.Id);
            if (entity == null)
                return new ServiceResponse("Êîðèñòóâà÷à íå çíàéäåíî");

            if (await _userManager.Users
                .FirstOrDefaultAsync(u => u.Id != dto.Id && u.NormalizedUserName == dto.UserName.ToUpper()) != null)
                return new ServiceResponse("Êîðèñòóâà÷ ³ç òàêèì email âæå ³ñíóº");
            else if (entity.NormalizedUserName != dto.UserName.ToUpper())
            {
                var userNameRes = await _userManager.SetUserNameAsync(entity, dto.UserName);
                if (!userNameRes.Succeeded)
                    return new ServiceResponse(userNameRes.Errors.First().Description);
            }

            if (await _userManager.Users
                .FirstOrDefaultAsync(u => u.Id != dto.Id && u.NormalizedEmail == dto.Email.ToUpper()) != null)
                return new ServiceResponse("Êîðèñòóâà÷ ³ç òàêèì ³ì'ÿì âæå ³ñíóº");
            else if (entity.NormalizedEmail != dto.Email.ToUpper())
            {
                var emailRes = await _userManager.SetEmailAsync(entity, dto.Email);
                if (!emailRes.Succeeded)
                    return new ServiceResponse(emailRes.Errors.First().Description);
            }

            entity = _mapper.Map(dto, entity);
            
            // image -->
            if (dto.Image != null)
            {
                var imageName = await _fileService.SaveImageAsync(dto.Image, Settings.AvatarsPath);
                if (!string.IsNullOrEmpty(imageName))
                {
                    if (!string.IsNullOrEmpty(entity.Image))
                        _fileService.Delete(entity.Image);

                    entity.Image = imageName;
                }
            }
            // <-- image
            
            var result = await _userManager.UpdateAsync(entity);
            if (!result.Succeeded)
                return new ServiceResponse(result.Errors.First().Description);

            // roles -->
            var userRoles = await _userManager.GetRolesAsync(entity);

            var deleteRoles = userRoles.Where(r => !dto.Roles.Contains(r));

            if (deleteRoles.Any())
            {
                var deleteRes = await _userManager.RemoveFromRolesAsync(entity, deleteRoles);
                if (!deleteRes.Succeeded)
                    return new ServiceResponse(deleteRes.Errors.First().Description);
            }

            var newRoles = dto.Roles.Where(r => !userRoles.Contains(r));
            if (newRoles.Any())
            {
                var addRes = await _userManager.AddToRolesAsync(entity, newRoles);
                if (!addRes.Succeeded)
                    return new ServiceResponse(addRes.Errors.First().Description);
            }
            // <-- roles

            return new ServiceResponse("Êîðèñòóâà÷à óñï³øíî îíîâëåíî", true);
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _userManager.FindByIdAsync(id);
            
            if (entity == null)
                return new ServiceResponse("Êîðèñòóâà÷à íå çíàéäåíî");

            if (!string.IsNullOrEmpty(entity.Image))
                _fileService.Delete(entity.Image);

            var result = await _userManager.DeleteAsync(entity);

            if (result.Succeeded)
                return new ServiceResponse("Êîðèñòóâà÷à óñï³øíî âèäàëåíî", true);

            return new ServiceResponse(result.Errors.First().Description);
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            return await GetUserAsync(u => u.Id == id);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var entities = await _userManager.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .AsNoTracking()
                .ToListAsync();

            var dtos = _mapper.Map<IEnumerable<UserDto>>(entities);
            
            return new ServiceResponse("Êîðèñòóâà÷³â îòðèìàíî", true, dtos);
        }

        public async Task<ServiceResponse> GetByUserNameAsync(string userName)
        {
            return await GetUserAsync(u => u.NormalizedUserName == userName.ToUpper() 
                                           || u.NormalizedUserName.Contains(userName.ToUpper()));
        }

        public async Task<ServiceResponse> GetByEmailAsync(string email)
        {
            return await GetUserAsync(u => u.NormalizedEmail == email.ToUpper() 
                                           || u.NormalizedEmail.Contains(email.ToUpper()));
        }

        public async Task<ServiceResponse> GetUserAsync(Expression<Func<AppUser, bool>> predicate)
        {
            var entity = await _userManager.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .AsNoTracking()
                .FirstOrDefaultAsync(predicate);

            if (entity == null)
                return new ServiceResponse("Êîðèñòóâà÷à íå çíàéäåíî");

            var dto = _mapper.Map<UserDto>(entity);

            return new ServiceResponse("Êîðèñòóâà÷à îòðèìàíî", true, dto);
        }

        private async Task<bool> UniqueEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email) == null;
        }

        private async Task<bool> UniqueUserNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName) == null;
        }
    }
}