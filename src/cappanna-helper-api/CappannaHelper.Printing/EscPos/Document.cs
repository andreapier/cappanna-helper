﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CappannaHelper.Printing.EscPos
{
    public class Document : IDocument
    {
        private readonly List<Page> _pages;

        public IPage DefaultPage => _pages.First();
        public IPage LastPage => _pages.Last();

        public int CopyNumber { get; private set; }

        public Document()
        {
            _pages = new List<Page>();
            CopyNumber = 1;
            CreatePage();
        }

        public IPage CreatePage()
        {
            var result = new Page();
            _pages.Add(result);

            return result;
        }

        public byte[] Render()
        {
            return BuildMultiCopyCommand().ToArray();
        }

        public IDocument SetCopyNumber(int copyNumber)
        {
            if (copyNumber <= 0)
            {
                //TODO: Do not hardcode string resources
                throw new ArgumentException("Number of copies must be positive", nameof(copyNumber));
            }

            CopyNumber = copyNumber;

            return this;
        }

        private List<byte> BuildMultiCopyCommand()
        {
            var commandBuilder = new List<byte>();

            for (var counter = 0; counter < CopyNumber; counter++)
            {
                BuildSingleCopyCommand(commandBuilder);
            }

            return commandBuilder;
        }

        private List<byte> BuildSingleCopyCommand(List<byte> commandBuilder)
        {
            commandBuilder.AddRange(Commands.INITIALIZE_PRINTER);

            for (var counter = 0; counter < _pages.Count; counter++)
            {
                var page = _pages[counter];
                page.Visit(commandBuilder);

                if (counter < _pages.Count - 1)
                {
                    commandBuilder.AddRange(Commands.CUT_PARTIAL);
                }
            }

            commandBuilder.AddRange(Commands.CUT_FULL);

            return commandBuilder;
        }
    }
}
