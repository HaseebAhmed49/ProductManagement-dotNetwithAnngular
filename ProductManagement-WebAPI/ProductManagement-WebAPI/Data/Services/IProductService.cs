using System;
using ProductManagement_WebAPI.Models;

namespace ProductManagement_WebAPI.Data.Services
{
    public interface IProductService
    {
        public Task<Product> AddProduct(ProductVM productVM);

        public Task<Product> GetProductById(int id);

        public Task<List<Product>> GetAllProducts();

        public Task<Product> UpdateProductById(int id, ProductVM productVM);

        public Task<Product> DeleteProduct(int id);

    }
}

