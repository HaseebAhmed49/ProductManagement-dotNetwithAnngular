using System;
using ProductManagement_WebAPI.Models;

namespace ProductManagement_WebAPI.Data
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                if (!context.Products.Any())
                {
                    context.Products.AddRange(new Product()
                    {
                        ProductName = "Test product 1",
                        ProductDescription = "test description 1",
                        ProductCost = 1,
                        ProductStock = 1
                    }, new Product()
                    {
                        ProductName = "Test product 2",
                        ProductDescription = "test description 2",
                        ProductCost = 2,
                        ProductStock = 2
                    }, new Product()
                    {
                        ProductName = "Test product 3",
                        ProductDescription = "test description 3",
                        ProductCost = 3,
                        ProductStock = 3
                    });
                    context.SaveChanges();
                }

            }
        }
    }
}
