using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cars.Domain;
using Microsoft.AspNetCore.Identity;

namespace Cars.Infrastructure
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "franek", UserName = "Franco123", Email = "franek@test.com", Bio = "uzytkownik"},
                    new AppUser{DisplayName = "asia", UserName = "Asiula123", Email = "asia@test.com", Bio = "uzytkownik"},
                    new AppUser{DisplayName = "darek", UserName = "Dario123", Email = "darek@test.com", Bio = "uzytkownik"},
                    new AppUser{DisplayName = "michal", UserName = "Szef123", Email = "michal@test.com", Bio = "uzytkownik"}
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Hase!l0123");
                }
            }


            if (context.Cars.Any()) return;

            var cars = new List<Car>
            {
                new Car
                {
                    Brand = "Toyota",
                    Model = "Yaris",
                    DoorsNumber = 3,
                    LuggageCapacity = 360,
                    EngineCapacity = 2310,
                    FuelType = FuelType.Petrol,
                    ProductionDate = DateTime.UtcNow.AddMonths(-1),
                    CarFuelConsumption = 18.1,
                    BodyType = Bodytype.Hatchback
                },
                new Car
                {
                    Brand = "Peugeot",
                    Model = "307",
                    DoorsNumber = 5,
                    LuggageCapacity = 421,
                    EngineCapacity = 1997,
                    FuelType = FuelType.Diesel,
                    ProductionDate = DateTime.UtcNow.AddYears(-18),
                    CarFuelConsumption = 7.2,
                    BodyType = Bodytype.Sedan
                }
            };

            // załadowanie danych do pamięci
            await context.Cars.AddRangeAsync(cars);
            // dodanie rekordów do bazy danych
            await context.SaveChangesAsync();
        }
    }
}
