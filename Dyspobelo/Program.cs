using Dyspobelo.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Pobieranie connection string z zmiennej œrodowiskowej
var azureMySqlConnectionString = Environment.GetEnvironmentVariable("AZURE_MYSQL_CONNECTIONSTRING");


builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseMySql(azureMySqlConnectionString, new MySqlServerVersion(new Version(8, 0, 21))));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();