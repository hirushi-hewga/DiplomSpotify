using FluentValidation;

namespace SpotifyAPI.BLL.DTOs.Account
{
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateOnly BirthDate { get; set; }
    }
    
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Username is required")
                .MaximumLength(20).WithMessage("maximum length 20 characters");
            
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Incorrect email format");
            
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8)
                .Matches("[A-Z]").WithMessage("Must contain upper")
                .Matches("[a-z]").WithMessage("Must contain lower")
                .Matches("[0-9]").WithMessage("Must contain digit");

            RuleFor(x => x.BirthDate)
                .Must(d => d != default).WithMessage("Дата народження обов'язкова")
                .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow)).WithMessage("Дата народження не може бути в майбутньому")
                .GreaterThan(new DateOnly(1900, 1, 1)).WithMessage("Некоректна дата народження")
                .Must(ValidAge).WithMessage("Вам має бути щонайменше 13 років");
        }
        
        private static bool ValidAge(DateOnly birthDate)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - birthDate.Year;
            if (birthDate > today.AddYears(-age))
                age--;

            return age >= 13;
        }
    }
    
}