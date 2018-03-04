using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace CappannaHelper.Printing.Tests.EscPos
{
    public class LabelTests
    {
        [Fact]
        public void Has_Sane_Default_Values()
        {
            var label = new Label();

            Assert.Empty(label.Content);
        }

        [Theory]
        [InlineData("")]
        [InlineData("test")]
        public void Sets_Label_If_Not_Null(string content)
        {
            var label = new Label();

            label.SetContent(content);

            Assert.Equal(content, label.Content);
        }

        [Fact]
        public void Set_Content_Throws_If_Null()
        {
            var label = new Label();

            var exception = Assert.Throws<ArgumentNullException>(() => label.SetContent(null));
            Assert.Equal("content", exception.ParamName);
        }

        [Fact]
        public void Visit_Throws_If_Null()
        {
            var label = new Label();

            var exception = Assert.Throws<ArgumentNullException>(() => label.Visit(null));
            Assert.Equal("commandBuilder", exception.ParamName);
        }

        [Fact]
        public void Visit_Appends_CPI_0_Command()
        {
            var label = new Label();
            var commandBuilder = new List<byte>();

            label.Visit(commandBuilder);

            Assert.NotNull(commandBuilder);
            var cpi0 = new byte[Commands.CPI_0.Count];
            Array.Copy(commandBuilder.ToArray(), 0, cpi0, 0, Commands.CPI_0.Count);
            Assert.Equal(Commands.CPI_0, cpi0);
        }

        [Theory]
        [InlineData("")]
        [InlineData("test")]
        public void Visit_Appends_Content(string content)
        {
            var contentRaw = Encoding.ASCII.GetBytes(content);
            var label = new Label();
            var commandBuilder = new List<byte>();

            label.SetContent(content);
            label.Visit(commandBuilder);

            Assert.NotNull(commandBuilder);
            var actualContentRaw = new byte[commandBuilder.Count - Commands.CPI_0.Count];
            Array.Copy(commandBuilder.ToArray(), Commands.CPI_0.Count, actualContentRaw, 0, commandBuilder.Count - Commands.CPI_0.Count);
            Assert.Equal(contentRaw, actualContentRaw);
        }
    }
}
