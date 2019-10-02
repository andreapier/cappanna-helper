using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Printing;
using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CappannaHelper.Api.Printing
{
    public class OrderDocumentBuilder : IPrinterDocumentBuilder<ChOrder>
    {
        private readonly Document _document;

        public OrderDocumentBuilder()
        {
            _document = new Document();
        }

        private void SetHeader(string title, string stand, int orderId, string table, int seats, ApplicationUser waiter, DateTime creationTimestamp, int size)
        {
            SetTitle(title);
            SetStand(stand);
            SetOrderId(orderId, size);
            SetTable(table, size);
            SetSeats(seats, size);
            SetWaiter(waiter, size);
            SetCreationTimestamp(creationTimestamp, size);
        }

        private void SetTitle(string title)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(24);
            section.Bold = true;
            section.CreateLabel().SetContent(title);
            section.NewLine();
        }

        private void SetStand(string stand)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(24);
            section.Bold = true;
            section.CreateLabel().SetContent($"Stand:  {stand.ToString()}");
            section.NewLine();
        }

        private void SetOrderId(int orderId, int size)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(size);
            section.CreateLabel().SetContent($"Ordine:  {orderId.ToString().PadLeft(3, ' ')}  ");
            section.NewLine();
        }

        private void SetTable(string table, int size)
        {
            var section = _document.LastPage.CreateSection();
            var tableStr = table.ToString();

            if (tableStr.Length <= 11)
            {
                tableStr = tableStr.PadLeft(11, ' ');
            }
            else
            {
                tableStr = tableStr.Substring(0, 11);
            }
            
            section.SetSize(size);
            section.CreateLabel().SetContent($"Tav:   {tableStr}");
            section.NewLine();
        }

        private void SetSeats(int seats, int size)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(size);
            section.CreateLabel().SetContent($"Coperti: {seats.ToString().PadLeft(3, ' ')}  ");
        }

        private void SetWaiter(ApplicationUser waiter, int size)
        {
            var section = _document.LastPage.CreateSection();
            var firstName = waiter.FirstName.Length <= 11 ? waiter.FirstName.PadLeft(11, ' ') : waiter.FirstName.Substring(0, 11);
            section.SetSize(size);
            section.CreateLabel().SetContent($"Camer: {firstName}");
            section.NewLine();
        }

        private void SetCreationTimestamp(DateTime creationTimestamp, int size)
        {
            var section = _document.LastPage.CreateSection();
            var localCreationTimestamp = TimeZoneInfo.ConvertTime(creationTimestamp, TimeZoneInfo.Local);
            section.SetSize(size);
            section.CreateLabel().SetContent($"Orario: {localCreationTimestamp.ToString("HH:mm:ss")}");
            section.NewLine();
        }

        private void SetDishes(IEnumerable<OrderDetail> details, int size)
        {
            var section = _document.LastPage.CreateSection();
            section.NewLine();

            AddAppetizers(details.Where(d => d.Item.Group == MenuDetail.APPETIZER), size);
            AddFirstDishes(details.Where(d => d.Item.Group == MenuDetail.FIRST_DISH), size);
            AddSecondDishes(details.Where(d => d.Item.Group == MenuDetail.SECOND_DISH), size);
            AddSideDishes(details.Where(d => d.Item.Group == MenuDetail.SIDE_DISH), size);
        }

        private void SetDrinks(IEnumerable<OrderDetail> details, int size)
        {
            AddWines(details.Where(d => d.Item.Group.Contains(MenuDetail.WINE)), size);
            AddWaters(details.Where(d => d.Item.Group == MenuDetail.WATER), size);
            AddOtherDrinks(details.Where(d => d.Item.Group == MenuDetail.DRINK), size);
            AddDesserts(details.Where(d => d.Item.Group == MenuDetail.DESSERT_DISH), size);
        }

        public IPrinterDocumentBuilder<ChOrder> SetData(ChOrder order)
        {
            if (order.Details.Any(d => d.Item.IsDish))
            {
                SetHeader("CUCINA", order.Stand.PrintLabel, order.ShiftCounter, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp, 16);
                SetDishes(order.Details, 16);
                SetNotes(order.Notes, 16);
                
                AddPage(16);
            }
            
            SetHeader("BAR", order.Stand.PrintLabel, order.ShiftCounter, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp, 12);
            SetDishes(order.Details, 12);

            if (order.Details.Any(d => d.Item.IsDrink))
            {
                SetDrinks(order.Details, 12);
            }

            SetNotes(order.Notes, 12);
            BlankFeed(12);

            return this;
        }

        public IDocument Build()
        {
            return _document;
        }

        private void AddAppetizers(IEnumerable<OrderDetail> appetizers, int size)
        {
            if (appetizers.Count() == 0)
            {
                return;
            }

            AddMenuItemCategoryHeader(MenuDetail.APPETIZER, size);
            AddDetails(appetizers, size);
        }

        private void AddFirstDishes(IEnumerable<OrderDetail> firstDishes, int size)
        {
            if (firstDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.FIRST_DISH, size);
            AddDetails(firstDishes, size);
        }

        private void AddSecondDishes(IEnumerable<OrderDetail> secondDishes, int size)
        {
            if (secondDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.SECOND_DISH, size);
            AddDetails(secondDishes, size);
        }

        private void AddSideDishes(IEnumerable<OrderDetail> sideDishes, int size)
        {
            if (sideDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.SIDE_DISH, size);
            AddDetails(sideDishes, size);
        }

        private void AddWines(IEnumerable<OrderDetail> wines, int size)
        {
            if (wines.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.WINE, size);
            AddDetails(wines, size);
        }

        private void AddWaters(IEnumerable<OrderDetail> waters, int size)
        {
            if (waters.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.WATER, size);
            AddDetails(waters, size);
        }

        private void AddOtherDrinks(IEnumerable<OrderDetail> otherDrinks, int size)
        {
            if (otherDrinks.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.DRINK, size);
            AddDetails(otherDrinks, size);
        }

        private void AddDesserts(IEnumerable<OrderDetail> desserts, int size)
        {
            if (desserts.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.DESSERT_DISH, size);
            AddDetails(desserts, size);
        }

        private void AddPage(int size)
        {
            BlankFeed(size);
            _document.CreatePage();
        }

        private void BlankFeed(int size)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(size);
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
        }

        private void AddMenuItemCategoryHeader(string header, int size)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(size);
            section.HorizontalAlignment = HorizontalAlignments.Center;
            section.Underline = true;
            section.CreateLabel().SetContent(header.ToUpper());
            section.NewLine();
        }

        private void AddDetails(IEnumerable<OrderDetail> details, int size)
        {
            var orderedDetails = details.OrderBy(d => d.ItemId);

            foreach(var detail in orderedDetails)
            {
                var name = detail.Item.Name;
                var dotsLength = 30 - detail.Item.Name.Length;
                var dots = string.Empty.PadLeft(dotsLength > 0 ? dotsLength : 0, '.');
                var dotsSection = _document.LastPage.CreateSection();
                var section = _document.LastPage.CreateSection();

                section.SetSize(size);
                section.CreateLabel().SetContent(name);
                section.CreateLabel().SetContent($"{dots}");
                section.CreateLabel().SetContent($"{detail.Quantity.ToString().PadLeft(2, ' ')}");
                section.NewLine();
            }
        }

        private void SetNotes(string notes, int size)
        {
            if (!string.IsNullOrEmpty(notes))
            {
                AddMenuItemCategoryHeader("NOTE", size);

                var section = _document.LastPage.CreateSection();
                section.SetSize(12);
                section.CreateLabel().SetContent(notes);
                section.NewLine();
            }
        }
    }
}
