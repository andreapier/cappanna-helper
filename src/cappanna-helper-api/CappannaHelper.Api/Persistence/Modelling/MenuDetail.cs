using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class MenuDetail
    {
        public const string APPETIZER = "Antipasti";
        public const string FIRST_DISH = "Primi piatti";
        public const string SECOND_DISH = "Secondi piatti";
        public const string SIDE_DISH = "Contorni";
        public const string DESSERT_DISH = "Dolci";
        public const string WINE = "Vini";
        public const string GLASS = "Bicchiere";
        public const string WHITE_WINE = WINE + " Bianchi";
        public const string WHITE_WINE_GLASS = WHITE_WINE + " " + GLASS;
        public const string RED_WINE = WINE + " Rossi";
        public const string RED_WINE_GLASS = RED_WINE + " " + GLASS;
        public const string WATER = "Acqua";
        public const string DRINK = "Bibite";

        public bool IsDish => APPETIZER.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || FIRST_DISH.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || SECOND_DISH.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || SIDE_DISH.Equals(Group, StringComparison.InvariantCultureIgnoreCase);
        public bool IsDrink => WHITE_WINE.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || WHITE_WINE_GLASS.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || RED_WINE.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || RED_WINE_GLASS.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || WATER.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || DRINK.Equals(Group, StringComparison.InvariantCultureIgnoreCase)
            || DESSERT_DISH.Equals(Group, StringComparison.InvariantCultureIgnoreCase);

        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Group { get; set; }
        public string Name { get; set; }
        public int? UnitsInStock { get; set; }
    }
}