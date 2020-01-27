// using System.Text;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

// using Backend.Services;
// using System;

// namespace Backend
// {
//     public class Startup
//     {
//         public Startup(IConfiguration configuration)
//         {
//             Configuration = configuration;
//         }

//         public IConfiguration Configuration { get; }

//         // Configurar serviços ao container
//         public void ConfigureServices(IServiceCollection services)
//         {
//             // Adiciona configuração de segurança
//             services.AddCors();

//             // Adiciona controllers
//             services.AddControllers();

//             // configurar propriedades definidas no appSettings.json
//             var appSettingsSection = Configuration.GetSection("AppSettings");
//             services.Configure<AppSettings>(appSettingsSection);

//             // configuração de autenticação via jwt 
//             var appSettings = appSettingsSection.Get<AppSettings>();
//             // obtém palavra chave armazenada no arquivo appSettings.json
//             var key = Encoding.ASCII.GetBytes(appSettings.Secret);

//             //IdentityModelEventSource.ShowPII = true;     

//             // adiciona JWT ao serviço de autenticação
//             services.AddAuthentication(x =>
//             {
//                 x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//                 x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//             })
//             .AddJwtBearer(x =>
//             {
//                 // Habilitar em produção
//                 x.RequireHttpsMetadata = false;
//                 x.SaveToken = true;
//                 x.TokenValidationParameters = new TokenValidationParameters
//                 {
//                     ValidateIssuerSigningKey = true,
//                     IssuerSigningKey = new SymmetricSecurityKey(key),
//                     ValidateIssuer = false,
//                     ValidateAudience = false
//                 };
//             });

//             // configura DI para os serviços
//             services.AddScoped<IUserService, UserService>();
//         }

//         // Configura requisições HTTP 
//         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//         {
            
//             // Produção
//             if (!env.IsDevelopment()){
//                 DefaultFilesOptions options = new DefaultFilesOptions();
//                 options.DefaultFileNames.Clear();
//                 options.DefaultFileNames.Add("index.html");

//                 app.UseDefaultFiles(options);
//                 app.UseStaticFiles();
//             }else{
//                 app.UseDeveloperExceptionPage();
//             }

//             app.UseRouting();

//             // configuração global de politicas de segurança do cors
//             app.UseCors(x => x
//                 .AllowAnyOrigin()
//                 .AllowAnyMethod()
//                 .AllowAnyHeader());

//             app.UseAuthentication();
//             app.UseAuthorization();
            
//             //app.UseHttpsRedirection();
//             app.UseEndpoints(endpoints =>
//             {
//                 endpoints.MapControllerRoute(
//                     name: "default",
//                     pattern: "{controller}/{action=Index}/{id?}");
//             });

            
//             app.UseSpa(spa =>
//             {
//                 // To learn more about options for serving an Angular SPA from ASP.NET Core,
//                 // see https://go.microsoft.com/fwlink/?linkid=864501

//                 spa.Options.SourcePath = "App";

//                 if (env.IsDevelopment())
//                 {
//                     //spa.UseAngularCliServer(npmScript: "start");
//                     spa.UseReactDevelopmentServer(npmScript: "start");
//                     spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
//                     //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
//                 }
//             });


//         }
//     }
// }

using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

using Backend.Helpers;
using Backend.Services;

namespace Backend
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // use sql server db in production and sqlite db in development
            //if (_env.IsProduction())
            services.AddDbContext<DataContext>();
            //else
            //services.AddDbContext<DataContext, SqliteDataContext>();

            services.AddCors();
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // configuração da aplicação appSettings.json
            var appSettingsSection = _configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configuração jwt autenticação
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            // retorna não authorizado se o usuário não estiver mais
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configuração DI para serviços de aplicação
            services.AddScoped<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            // migrate any database changes on startup (includes initial db creation)
            //dataContext.Database.Migrate();

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

                        app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "App";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                }
            });
        }
    }
}
