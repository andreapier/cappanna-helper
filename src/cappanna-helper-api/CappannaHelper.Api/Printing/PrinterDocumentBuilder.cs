using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Printing;
using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CappannaHelper.Api.Printing
{
    public class PrinterDocumentBuilder : IPrinterDocumentBuilder
    {
        private readonly Document _document;

        public PrinterDocumentBuilder()
        {
            _document = new Document();
        }

        private void SetHeader(string title, int orderId, string table, int seats, ApplicationUser waiter, DateTime creationTimestamp)
        {
            SetTitle(title);
            SetOrderId(orderId);
            SetTable(table);
            SetSeats(seats);
            SetWaiter(waiter);
            SetCreationTimestamp(creationTimestamp);
        }

        private void SetTitle(string title)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(24);
            section.HorizontalAlignment = HorizontalAlignments.Center;
            section.Bold = true;
            section.CreateLabel().SetContent(title);
            section.NewLine();
        }

        private void SetOrderId(int orderId)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent($"Ordine:  {orderId.ToString().PadLeft(3, ' ')}  ");
        }

        private void SetTable(string table)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent($"Tavolo:    {table.ToString().PadLeft(4, ' ')}");
            section.NewLine();
        }

        private void SetSeats(int seats)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent($"Coperti: {seats.ToString().PadLeft(3, ' ')}  ");
        }

        private void SetWaiter(ApplicationUser waiter)
        {
            var section = _document.LastPage.CreateSection();
            var firstName = waiter.FirstName.Length <= 8 ? waiter.FirstName : waiter.FirstName.Substring(0, 8);
            section.SetSize(16);
            section.CreateLabel().SetContent($"Cameriere: {firstName}");
            section.NewLine();
        }

        private void SetCreationTimestamp(DateTime creationTimestamp)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent($"Orario: {creationTimestamp.ToString("HH:mm:ss")}");
            section.NewLine();
        }

        private void SetDishes(IEnumerable<OrderDetail> details)
        {
            var section = _document.LastPage.CreateSection();
            section.NewLine();

            AddAppetizers(details.Where(d => d.Item.Group == MenuDetail.APPETIZER));
            AddFirstDishes(details.Where(d => d.Item.Group == MenuDetail.FIRST_DISH));
            AddSecondDishes(details.Where(d => d.Item.Group == MenuDetail.SECOND_DISH));
            AddSideDishes(details.Where(d => d.Item.Group == MenuDetail.SIDE_DISH));
        }

        private void SetDrinks(IEnumerable<OrderDetail> details)
        {
            AddWines(details.Where(d => d.Item.Group.Contains(MenuDetail.WINE)));
            AddWaters(details.Where(d => d.Item.Group == MenuDetail.WATER));
            AddOtherDrinks(details.Where(d => d.Item.Group == MenuDetail.DRINK));
            AddDesserts(details.Where(d => d.Item.Group == MenuDetail.DESSERT_DISH));
        }

        public IPrinterDocumentBuilder SetOrder(ChOrder order)
        {
            if (order.Details.Any(d => d.Item.IsDish))
            {
                SetHeader("CUCINA", order.ShiftId, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp);
                SetDishes(order.Details);
                SetNotes(order.Notes);
                
                AddPage();
            }
            
            SetHeader("BAR", order.ShiftId, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp);
            SetDishes(order.Details);

            if (order.Details.Any(d => d.Item.IsDrink))
            {
                SetDrinks(order.Details);
            }

            SetNotes(order.Notes);
            BlankFeed();

            return this;
        }

        public IDocument Build()
        {
            return _document;
        }

        private void AddAppetizers(IEnumerable<OrderDetail> appetizers)
        {
            if (appetizers.Count() == 0)
            {
                return;
            }

            AddMenuItemCategoryHeader(MenuDetail.APPETIZER);
            AddDetails(appetizers);
        }

        private void AddFirstDishes(IEnumerable<OrderDetail> firstDishes)
        {
            if (firstDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.FIRST_DISH);
            AddDetails(firstDishes);
        }

        private void AddSecondDishes(IEnumerable<OrderDetail> secondDishes)
        {
            if (secondDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.SECOND_DISH);
            AddDetails(secondDishes);
        }

        private void AddSideDishes(IEnumerable<OrderDetail> sideDishes)
        {
            if (sideDishes.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.SIDE_DISH);
            AddDetails(sideDishes);
        }

        private void AddWines(IEnumerable<OrderDetail> wines)
        {
            if (wines.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.WINE);
            AddDetails(wines);
        }

        private void AddWaters(IEnumerable<OrderDetail> waters)
        {
            if (waters.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.WATER);
            AddDetails(waters);
        }

        private void AddOtherDrinks(IEnumerable<OrderDetail> otherDrinks)
        {
            if (otherDrinks.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.DRINK);
            AddDetails(otherDrinks);
        }

        private void AddDesserts(IEnumerable<OrderDetail> desserts)
        {
            if (desserts.Count() == 0)
            {
                return;
            }
            
            AddMenuItemCategoryHeader(MenuDetail.DESSERT_DISH);
            AddDetails(desserts);
        }

        private void AddPage()
        {
            BlankFeed();
            _document.CreatePage();
        }

        private void BlankFeed()
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
        }

        private void AddMenuItemCategoryHeader(string header)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.HorizontalAlignment = HorizontalAlignments.Center;
            section.Underline = true;
            section.CreateLabel().SetContent(header.ToUpper());
            section.NewLine();
        }

        private void AddDetails(IEnumerable<OrderDetail> details)
        {
            var orderedDetails = details.OrderBy(d => d.ItemId);

            foreach(var detail in orderedDetails)
            {
                var name = detail.Item.Name;
                var dotsLength = 30 - detail.Item.Name.Length;
                var dots = string.Empty.PadLeft(dotsLength > 0 ? dotsLength : 0, '.');
                var dotsSection = _document.LastPage.CreateSection();
                var section = _document.LastPage.CreateSection();

                section.SetSize(16);
                section.CreateLabel().SetContent(name);
                section.CreateLabel().SetContent($"{dots}");
                section.CreateLabel().SetContent($"{detail.Quantity.ToString().PadLeft(2, ' ')}");
                section.NewLine();
            }
        }

        private void SetNotes(string notes)
        {
            if (!string.IsNullOrEmpty(notes))
            {
                AddMenuItemCategoryHeader("NOTE");

                var section = _document.LastPage.CreateSection();
                section.SetSize(12);
                section.CreateLabel().SetContent(notes);
                section.NewLine();
            }
        }
    }
}