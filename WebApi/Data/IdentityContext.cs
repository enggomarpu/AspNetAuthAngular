using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Data
{
    public class IdentityContext: IdentityDbContext<AppUser>
    {
        public IdentityContext(DbContextOptions options) : base(options)
        {}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.ApplyConfiguration(new RoleConfiguration());
		}
	}
}
