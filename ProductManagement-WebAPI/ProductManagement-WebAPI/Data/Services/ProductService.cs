using System;
using Microsoft.EntityFrameworkCore;
using ProductManagement_WebAPI.Models;

namespace ProductManagement_WebAPI.Data.Services
{
    public class ProductService:IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Product> AddProduct(ProductVM productVM)
        {
            var newProduct = new Product
            {
                ProductName = productVM.ProductName,
                ProductCost = productVM.ProductCost,
                ProductDescription = productVM.ProductDescription,
                ProductStock = productVM.ProductStock
            };
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return newProduct;
        }

        public async Task<Product> DeleteProduct(int id)
        {
            var productFound = _context.Products.FirstOrDefault(x => x.ProductId == id);
            if (productFound != null)
            {
                _context.Products.Remove(productFound);
                await _context.SaveChangesAsync();
            }
            return productFound;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            return products;
        }

        public async Task<Product> GetProductById(int id)
        {
            var productFound = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            return productFound;
        }

        public async Task<Product> UpdateProductById(int id, ProductVM productVM)
        {
            var productFound = _context.Products.FirstOrDefault(x => x.ProductId == id);
            if (productFound != null)
            {
                productFound.ProductName = productVM.ProductName;
                productFound.ProductStock = productVM.ProductStock;
                productFound.ProductDescription = productVM.ProductDescription;
                productFound.ProductCost = productVM.ProductCost;
                await _context.SaveChangesAsync();
            }
            return productFound;
        }
    }
}

