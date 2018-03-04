using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using Xunit;

namespace CappannaHelper.Printing.Tests.EscPos
{
    public class NewLineTests
    {
        [Fact]
        public void Visit_Throws_If_Null()
        {
            var element = new NewLine();

            var exception = Assert.Throws<ArgumentNullException>(() => element.Visit(null));
            Assert.Equal("commandBuilder", exception.ParamName);
        }

        [Fact]
        public void Visit_Appends_New_Line_Command()
        {
            var newLine = new NewLine();
            var commandBuilder = new List<byte>();

            newLine.Visit(commandBuilder);

            Assert.NotNull(commandBuilder);
            Assert.Equal(Commands.LINE_FEED, commandBuilder);
        }
    }
}
