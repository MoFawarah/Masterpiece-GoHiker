namespace MasterpieceBackEnd.DTOs
{
    public static class PasswordHasher
    {
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //var hmac = new System.Security.Cryptography.HMACSHA256()
            using (var h = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = h.Key; //The Key property provides a randomly generated salt (this represents the passwordSalt)
                //This key comes from the method 512;
                passwordHash = h.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); //this represents the value of
                //the hashpassword that will be actually stored in the SQL database >> password = hashedPassword
            }
        }

        public static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            //var hmac = new System.Security.Cryptography.HMACSHA256(storedSalt)
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash); //return true or false
            }
        }
    }
}
