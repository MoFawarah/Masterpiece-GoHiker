namespace MasterpieceBackEnd.DTOs
{

    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;



    public class TokenGenerator
    {
        private readonly IConfiguration _configuration;

        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(string? email)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = jwtSettings.GetValue<string>("Key");

            // Create a list of claims, but only include the email claim
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, email)
    };

            // Convert the secret key to a byte array
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var signingKey = new SymmetricSecurityKey(keyBytes);

            // Create signing credentials using the security key and algorithm
            var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            // Create the JWT token
            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"),
                audience: jwtSettings.GetValue<string>("Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),  // Set token expiration
                signingCredentials: creds
            );

            // Return the generated JWT token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}