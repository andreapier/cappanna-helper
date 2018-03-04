using System.Threading.Tasks;

namespace CappannaHelper.Printing
{
    public interface IPrinter
    {
        Task PrintAsync(IDocument document);
    }
}
