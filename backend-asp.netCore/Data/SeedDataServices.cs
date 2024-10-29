using CsvHelper;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

public static class SeedDataServices
{
    public static void SeedData(ModelBuilder modelBuilder)
    {
        // Specify the path to your CSV file
        var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", "FilmComposers.csv");

        using (var reader = new StreamReader(path))
        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        {
            var records = csv.GetRecords<Composer>().ToList();

            // Assuming your context is named AppDbContext
            modelBuilder.Entity<Composer>().HasData(records);
        }
    }
}
