using CappannaHelper.Printing.Communication.Windows;
using CappannaHelper.Printing.EscPos;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Examples
{
    public class SimplePrint
    {
        public async Task RunAsync(string printerName)
        {
            var resolver = new RegistryPrinterResolver(printerName);
            var document = new Document();
            var normalLabel = document.DefaultPage.DefaultSection.CreateLabel();
            normalLabel.SetContent("NORMAL");
            document.DefaultPage.DefaultSection.NewLine();

            var boldSection = document.DefaultPage.CreateSection();
            boldSection.Bold = true;
            var boldLabel = boldSection.CreateLabel();
            boldLabel.SetContent("BOLD");
            boldSection.NewLine();

            var underlineSection = document.DefaultPage.CreateSection();
            underlineSection.Underline = true;
            var underlineLabel = underlineSection.CreateLabel();
            underlineLabel.SetContent("UNDERLINE");
            underlineSection.NewLine();

            var italicSection = document.DefaultPage.CreateSection();
            italicSection.Italic = true;
            var italicLabel = italicSection.CreateLabel();
            italicLabel.SetContent("ITALIC");
            italicSection.NewLine();

            var rotatedSection = document.DefaultPage.CreateSection();
            rotatedSection.Rotation = Rotations.Rotation_90;
            var rotatedLabel = rotatedSection.CreateLabel();
            rotatedLabel.SetContent("ROTATED");
            rotatedSection.NewLine();

            var centeredSection = document.DefaultPage.CreateSection();
            centeredSection.HorizontalAlignment = HorizontalAlignments.Center;
            var centeredLabel = centeredSection.CreateLabel();
            centeredLabel.SetContent("CENTERED");
            centeredSection.NewLine();

            var rightAlignedSection = document.DefaultPage.CreateSection();
            rightAlignedSection.HorizontalAlignment = HorizontalAlignments.Right;
            var rightAlignedLabel = rightAlignedSection.CreateLabel();
            rightAlignedLabel.SetContent("RIGHT ALIGNED");
            rightAlignedSection.NewLine();

            using (var channel = new UsbChannel(resolver))
            {
                var printer = new Printer(channel);

                await channel.OpenAsync();
                await printer.PrintAsync(document);
            }
        }
    }
}
