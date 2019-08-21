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
            var cutFull = new byte[Commands.CUT_FULL.Count];
            Array.Copy(result, 0, initPrinter, 0, Commands.INITIALIZE_PRINTER.Count);
            Array.Copy(result, result.Length - Commands.CUT_FULL.Count, cutFull, 0, Commands.CUT_FULL.Count);
            Assert.Equal(Commands.INITIALIZE_PRINTER, initPrinter);
            Assert.Equal(Commands.CUT_FULL, cutFull);
        }

        [Fact]
        public void Visit_With_Multiple_Pages_Appends_Cut_Partial_Command()
        {
            var document = new Document();
            document.CreatePage();

            var result = document.Render();

            Assert.NotNull(result);
            var cutPartial = new byte[Commands.CUT_PARTIAL.Count];
            var startIndex = Commands.INITIALIZE_PRINTER.Count
                + Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count
                + Commands.SELECT_PRINT_MODE_HEADER.Count
                + 1
                + Commands.SELECT_CHARACTER_SIZE_HEADER.Count
                + 1
                + Commands.SELECT_JUSTIFICATION_CENTER.Count;
            Array.Copy(result, startIndex, cutPartial, 0, Commands.CUT_PARTIAL.Count);
            Assert.Equal(Commands.CUT_PARTIAL, cutPartial);
        }
    }
}
