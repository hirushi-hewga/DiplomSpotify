using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs.Role;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.Role
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMapper _mapper;

        public RoleService(RoleManager<AppRole> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }
        
        public async Task<ServiceResponse> CreateAsync(RoleDto dto)
        {
            if (await _roleManager.RoleExistsAsync(dto.Name))
                return new ServiceResponse($"'{dto.Name}' role already exists.");

            var entity = _mapper.Map<AppRole>(dto);
            
            var result = await _roleManager.CreateAsync(entity);
            if (result.Succeeded)
                return new ServiceResponse($"'{dto.Name}' role successfully created", true);

            return new ServiceResponse(result.Errors.First().Description);
        }

        public async Task<ServiceResponse> UpdateAsync(RoleDto dto)
        {
            if (await _roleManager.RoleExistsAsync(dto.Name))
                return new ServiceResponse($"'{dto.Name}' role already exists.");

            var entity = await _roleManager.FindByIdAsync(dto.Id);

            if (entity == null)
                return new ServiceResponse("role not found");

            entity = _mapper.Map(dto, entity);
            
            var result = await _roleManager.UpdateAsync(entity);
            if (result.Succeeded)
                return new ServiceResponse($"role successfully updated", true);

            return new ServiceResponse(result.Errors.First().Description);
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _roleManager.FindByIdAsync(id);

            if (entity == null)
                return new ServiceResponse("role not found");

            var result = await _roleManager.DeleteAsync(entity);

            if (result.Succeeded)
                return new ServiceResponse($"'{entity.Name}' role successfully deleted", true);

            return new ServiceResponse(result.Errors.First().Description);
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var entity = await _roleManager.FindByIdAsync(id);

            if (entity == null)
                return new ServiceResponse("role not found");
            
            var dto = _mapper.Map<RoleDto>(entity);

            return new ServiceResponse($"'{dto.Name}' role is found", true, dto);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var entities = await _roleManager.Roles.ToListAsync();

            var dtos = _mapper.Map<List<RoleDto>>(entities);

            return new ServiceResponse("roles is found", true, dtos);
        }
    }
}