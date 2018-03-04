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
        }

        private void SetOrderId(int orderId)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.Bold = true;
            section.CreateLabel().SetContent($"Ordine: {orderId}");
        }

        private void SetTable(string table)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.HorizontalAlignment = HorizontalAlignments.Right;
            section.Bold = true;
            section.CreateLabel().SetContent($"Tavolo: {table}");
            section.NewLine();
        }

        private void SetSeats(int seats)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent($"N. coperti: {seats}");
        }

        private void SetWaiter(ApplicationUser waiter)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.HorizontalAlignment = HorizontalAlignments.Right;
            section.CreateLabel().SetContent($"Cameriere: {waiter.FirstName}");
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
                SetHeader("CUCINA", order.Id, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp);
                SetDishes(order.Details);
                SetNotes(order.Notes);

                AddPage();
            }
            
            SetHeader("BAR", order.Id, order.ChTable, order.Seats, order.CreatedBy, order.CreationTimestamp);
            SetDishes(order.Details);
            SetNotes(order.Notes);

            if (order.Details.Any(d => d.Item.IsDrink))
            {
                SetDrinks(order.Details);
            }

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
            _document.CreatePage();
        }

        private void AddMenuItemCategoryHeader(string header)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.HorizontalAlignment = HorizontalAlignments.Center;
            section.Underline = true;
            section.CreateLabel().SetContent(header);
            section.NewLine();
        }

        private void AddDetails(IEnumerable<OrderDetail> details)
        {
            foreach(var detail in details)
            {
                var detailNameSection = _document.LastPage.CreateSection();
                detailNameSection.CreateLabel().SetContent(detail.Item.Name);

                var detailQuantitySection = _document.LastPage.CreateSection();
                detailQuantitySection.HorizontalAlignment = HorizontalAlignments.Right;
                detailQuantitySection.CreateLabel().SetContent($"{detail.Quantity}");
            }
        }

        private void SetNotes(string notes)
        {
            AddMenuItemCategoryHeader("NOTE");

            var section = _document.LastPage.CreateSection();
            section.SetSize(16);
            section.CreateLabel().SetContent(notes);
            section.NewLine();
        }
    }
}