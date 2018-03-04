using System;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Examples
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                MainAsync(args).Wait();
            }
            catch (Exception e)
            {
                Console.Error.WriteLine(e.Message);
            }

            Console.ReadLine();
        }

        static async Task MainAsync(string[] args)
        {
            if (args == null || args.Length == 0)
            {
                throw new ArgumentException("First argument must be printer name to use.", nameof(args));
            }

            var example = new SimplePrint();

            try
            {
                await example.RunAsync(args[0]);
            }
            catch (Exception e)
            {
                await Console.Error.WriteLineAsync(e.Message);
            }
        }
    }
}
