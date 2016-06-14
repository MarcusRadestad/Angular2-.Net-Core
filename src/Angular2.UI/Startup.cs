using Glimpse;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using System.IO;

namespace Angular2.UI
{
    public class Startup
    {

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            // services.AddGlimpse();  // not working in RC2
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {

            // https://github.com/aspnet/JavaScriptServices/
            // coolt att läsa...

            //app.UseDefaultFiles();

            // Serve wwwroot as root
            // app.UseFileServer();

            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                //app.UseGlimpse(); // not working in RC2

                var contentPath = System.IO.Path.Combine(env.ContentRootPath, "Client", "App");
                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(contentPath),
                    RequestPath = new PathString("/app")
                });

                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                loggerFactory.AddDebug();


                //app.UseFileServer(new FileServerOptions()
                //{
                //    FileProvider = new PhysicalFileProvider(contentPath),
                //    RequestPath = new PathString("/App"),
                //});

            }
            else {
                app.UseStaticFiles();
            }


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // 404 routingfor SPA
                routes.MapRoute("spa-fallback", "{*anything}", new { controller = "Home", action = "Index" });
            });


            //app.Use(async (context, next) =>
            //{
            //    await next();

            //    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            //    {
            //        context.Request.Path = "/index.html"; // Put your Angular root page here 
            //        await next();
            //    }
            //});


        }
    }
}
