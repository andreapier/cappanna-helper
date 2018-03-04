using System.Threading.Tasks;

namespace CappannaHelper.Printing.Templating
{
    public interface ITemplateParser
    {
        Task<ITemplate> ParseAsync(string templatePath);
    }
}
