using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Templating
{
    public class JsonFileTemplateParser : ITemplateParser
    {
        private readonly ITemplateProvider _builder;

        public JsonFileTemplateParser(ITemplateProvider builder)
        {
            _builder = builder ?? throw new ArgumentNullException(nameof(builder));
        }

        public async Task<ITemplate> ParseAsync(string templatePath)
        {
            var template = await File.ReadAllTextAsync(templatePath);
            var documentForm = JsonConvert.DeserializeObject<DocumentForm>(template);

            throw new NotImplementedException();
        }
    }
}
