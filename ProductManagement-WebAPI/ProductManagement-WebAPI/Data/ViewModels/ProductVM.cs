using System;
namespace ProductManagement_WebAPI.Models
{
    public class ProductVM
    {
        public string ProductName { get; set; }

        public string? ProductDescription { get; set; }

        public int ProductCost { get; set; }

        public int ProductStock { get; set; }
    }
}

