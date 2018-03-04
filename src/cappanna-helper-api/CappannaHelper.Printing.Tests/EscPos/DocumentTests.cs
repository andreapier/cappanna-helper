using CappannaHelper.Printing.EscPos;
using System;
using Xunit;

namespace CappannaHelper.Printing.Tests.EscPos
{
    public class DocumentTests
    {
        [Fact]
        public void Has_Sane_Default_Values()
        {
            var document = new Document();

            Assert.Equal(1, document.CopyNumber);
            Assert.NotNull(document.DefaultPage);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(5)]
        public void Sets_Copy_Number_If_Greater_Than_0(int copyNumber)
        {
            var document = new Document();

            document.SetCopyNumber(copyNumber);

            Assert.Equal(copyNumber, document.CopyNumber);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void Set_Copy_Number_Throws_If_Less_Than_Or_Equal_0(int copyNumber)
        {
            var document = new Document();

            var exception = Assert.Throws<ArgumentException>(() => document.SetCopyNumber(copyNumber));
            Assert.StartsWith("Number of copies must be positive", exception.Message);
            Assert.Equal("copyNumber", exception.ParamName);
        }

        [Fact]
        public void Can_Create_Page()
        {
            var document = new Document();

            var page = document.CreatePage();

            Assert.NotNull(page);
        }

        [Fact]
        public void Creates_Different_Pages()
        {
            var document = new Document();

            var page1 = document.CreatePage();
            var page2 = document.CreatePage();

            Assert.NotNull(page1);
            Assert.NotNull(page2);
            Assert.NotEqual(page1, page2);
        }

        [Fact]
        public void Renders_Empty_Document()
        {
            var document = new Document();

            var result = document.Render();

            Assert.NotNull(result);
            Assert.True(result.Length >= 11);
            var initPrinter = new byte[Commands.INITIALIZE_PRINTER.Count];
            var selectCharTable = new byte[Commands.SELECT_CHARACTER_CODE_TABLE_USA_AND_EUROPE.Count];
            var cutFull = new byte[Commands.CUT_FULL.Count];
            Array.Copy(result, 0, initPrinter, 0, Commands.INITIALIZE_PRINTER.Count);
            Array.Copy(result, Commands.INITIALIZE_PRINTER.Count, selectCharTable, 0, Commands.SELECT_CHARACTER_CODE_TABLE_USA_AND_EUROPE.Count);
            Array.Copy(result, result.Length - Commands.CUT_FULL.Count, cutFull, 0, Commands.CUT_FULL.Count);
            Assert.Equal(Commands.INITIALIZE_PRINTER, initPrinter);
            Assert.Equal(Commands.SELECT_CHARACTER_CODE_TABLE_USA_AND_EUROPE, selectCharTable);
            Assert.Equal(Commands.CUT_FULL, cutFull);
        }
    }
}
