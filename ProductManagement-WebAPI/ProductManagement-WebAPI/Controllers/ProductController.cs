using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagement_WebAPI.Data;
using ProductManagement_WebAPI.Data.Services;
using ProductManagement_WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("ProductsList")]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            try
            {
                var products = await _productService.GetAllProducts();
                return (products.Count > 0) ? Ok(products) : BadRequest("No Products Found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("ProductDetail")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            try
            {
                if (id < 0) return BadRequest("Product Id cant be negative or Zero");
                var product = await _productService.GetProductById(id);
                return (product!=null) ? Ok(product) : BadRequest($"No Product Found with Id: {id}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<ActionResult<Product>> POST([FromBody]ProductVM productVM)
        {
            try
            {
                if (String.IsNullOrEmpty(productVM.ProductName)) return BadRequest("Product should have some name");
                var newProduct = await _productService.AddProduct(productVM);
                return Created($"api/product/ProductDetails/{newProduct.ProductId}", newProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("DeleteProduct")]
        public async Task<ActionResult<IEnumerable<Product>>> Delete(int id)
        {
            if (id < 0) return BadRequest("Product Id cant be negative or Zero");
            var product = await _productService.DeleteProduct(id);
            return (product != null) ? Ok(product) : BadRequest($"No Product Found with Id: {id}");
        }

        [HttpPost]
        [Route("UpdateProduct")]
        public async Task<ActionResult<IEnumerable<Product>>> Update(int id, ProductVM productVM)
        {
            try
            {
                if (id < 0) return BadRequest("Product Id cant be negative or Zero");
                if (String.IsNullOrEmpty(productVM.ProductName)) return BadRequest("Product should have some name");
                var updatedProduct = await _productService.UpdateProductById(id,productVM);
                return Created($"api/product/ProductDetails/{updatedProduct.ProductId}", updatedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

