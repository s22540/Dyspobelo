using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Dyspobelo.Data; // Assuming this namespace contains your DbContext

var builder = WebApplication.CreateBuilder(args);

// DB CONTEXT CONFIGURATION
// Connection string from environment variable
var connectionString = Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING");
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21))));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();  // HSTS is optional and can be commented out if not needed
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();

app.Run();
