﻿using CappannaHelper.Printing.Communication;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Printing
{
    public class Printer : IPrinter
    {
        private readonly IChannel _channel;

        public Printer(IChannel channel)
        {
            _channel = channel ?? throw new ArgumentNullException(nameof(channel));
        }

        public async Task PrintAsync(IDocument document)
        {
            if (document == null)
            {
                throw new ArgumentNullException(nameof(document));
            }

            using(_channel)
            {
                await _channel.OpenAsync();
                var documentContent = document.Render();
                await _channel.WriteAsync(documentContent);
                await Task.Delay(2000);
            }
        }
    }
}
