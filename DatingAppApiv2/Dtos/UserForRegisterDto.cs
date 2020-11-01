using System.ComponentModel.DataAnnotations;

namespace DatingAppApiv2.Dtos {
    public class UserForRegisterDto {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must enter the password between 4 and 8 characters")]
        public string Password { get; set; }
    }
}