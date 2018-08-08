using System.ComponentModel.DataAnnotations;

namespace CappannaHelper.Api.Models
{
    public class MenuDetailModel
    {
        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Group { get; set; }

        [Required]
        public string Name { get; set; }

        public int? UnitsInStock { get; set; }
    }
}
