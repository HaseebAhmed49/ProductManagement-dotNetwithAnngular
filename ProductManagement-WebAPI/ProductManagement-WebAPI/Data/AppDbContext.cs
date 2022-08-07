using System;
using Microsoft.EntityFrameworkCore;
using ProductManagement_WebAPI.Models;

namespace ProductManagement_WebAPI.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public DbSet<Product> Products { get; set; }
    }
}

