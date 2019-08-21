using CappannaHelper.Printing.Communication;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CappannaHelper.Printing.Tests
{
    public class PrinterTests
    {
        [Fact]
        public void Throws_With_Null_Channel()
        {
            var statusFactory = new Mock<IStatusFactory>();
            var exception = Assert.Throws<ArgumentNullException>(() => new Printer(null, statusFactory.Object));

            Assert.NotNull(exception);
            Assert.Equal("channel", exception.ParamName);
        }
        [Fact]
        public void Throws_With_Null_StatusFactory()
        {
            var channel = new Mock<IChannel>();
            var exception = Assert.Throws<ArgumentNullException>(() => new Printer(channel.Object, null));

            Assert.NotNull(exception);
            Assert.Equal("statusFactory", exception.ParamName);
        }

        [Fact]
        public async Task Throws_With_Null_Document()
        {
            var channel = new Mock<IChannel>();
            var statusFactory = new Mock<IStatusFactory>();
            var printer = new Printer(channel.Object, statusFactory.Object);

            var exception = await Assert.ThrowsAsync<ArgumentNullException>(() => printer.PrintAsync(null));

            Assert.NotNull(exception);
            Assert.Equal("document", exception.ParamName);
        }

        [Fact]
        public async Task Prints_Document()
        {
            var documentRaw = new byte[0];
            byte[] writtenBytes = null;
            var renderCalled = false;
            var writeAsyncCalled = false;
            var channel = new Mock<IChannel>();
            var statusFactory = new Mock<IStatusFactory>();
            var printer = new Printer(channel.Object, statusFactory.Object);
            var document = new Mock<IDocument>();
            document.Setup(d => d.Render()).Returns(documentRaw).Callback(() => renderCalled = true);
            channel.Setup(c => c.WriteAsync(It.IsAny<byte[]>())).ReturnsAsync(true).Callback<byte[]>(w =>
            {
                writtenBytes = w;
                writeAsyncCalled = true;
            });

            await printer.PrintAsync(document.Object);

            Assert.True(renderCalled);
            Assert.True(writeAsyncCalled);
            Assert.Equal(documentRaw, writtenBytes);
        }
    }
}
