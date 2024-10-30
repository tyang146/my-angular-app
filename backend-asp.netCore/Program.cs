using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://serenade-ba82f.web.app") // Update with your frontend URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Configure Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowSpecificOrigin");
//app.Urls.Add("http://0.0.0.0:5000"); // set the port to 5000
app.MapGet("/", () =>
{
    return "Welcome to the API!"; 
});

app.MapControllers();

app.Run();
