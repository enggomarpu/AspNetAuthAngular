using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;
using WebApi.Data;
using WebApi.Errors;
using WebApi.Middleware;
using WebApi.Models;
using WebApi.Services;
using WebApi.Extensions;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
	options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<IdentityContext>(opts => opts.UseSqlite(builder.Configuration.GetConnectionString("sqliteConnection")));
builder.Services.AddDbContext<IdentityContext>(opts => opts.UseSqlServer(builder.Configuration.GetConnectionString("sqlConnection")));


builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddAuthentication();

builder.Services.AddScoped<JWTService>();
builder.Services.AddScoped<EmailService>();

builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
	options.Lockout.AllowedForNewUsers = true;
	options.SignIn.RequireConfirmedEmail = true;
    options.User.RequireUniqueEmail = true;


	//options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
	options.Lockout.MaxFailedAccessAttempts = 3;

})
    .AddRoles<IdentityRole>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddEntityFrameworkStores<IdentityContext>()
    .AddSignInManager<SignInManager<AppUser>>()
    .AddUserManager<UserManager<AppUser>>()
    .AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(opt =>
   opt.TokenLifespan = TimeSpan.FromHours(2));

builder.Services.ConfigureJWT(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
