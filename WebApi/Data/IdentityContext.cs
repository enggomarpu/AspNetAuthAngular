using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class IdentityContext: IdentityDbContext<User>
    {
        public IdentityContext(DbContextOptions options) : base(options)
        {
                
        }
    }
}
