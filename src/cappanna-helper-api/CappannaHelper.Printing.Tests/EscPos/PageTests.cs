using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using Xunit;

namespace CappannaHelper.Printing.Tests.EscPos
{
    public class PageTests
    {
        [Fact]
        public void Has_Sane_Default_Values()
        {
            var page = new Page();
            
            Assert.NotNull(page.DefaultSection);
        }

        [Fact]
        public void Can_Create_Section()
        {
            var page = new Page();

            var section = page.CreateSection();

            Assert.NotNull(section);
        }

        [Fact]
        public void Creates_Different_Pages()
        {
            var page = new Page();

            var section1 = page.CreateSection();
            var section2 = page.CreateSection();

            Assert.NotNull(section1);
            Assert.NotNull(section2);
            Assert.NotEqual(section1, section2);
        }

        [Fact]
        public void Visit_Appends_Cut_Partial_Command()
        {
            var page = new Page();
            var commandBuilder = new List<byte>();

            page.Visit(commandBuilder);

            Assert.NotNull(commandBuilder);
            var cutPartial = new byte[Commands.CUT_PARTIAL.Count];
            Array.Copy(commandBuilder.ToArray(), commandBuilder.Count - Commands.CUT_PARTIAL.Count, cutPartial, 0, Commands.CUT_PARTIAL.Count);
            Assert.Equal(Commands.CUT_PARTIAL, cutPartial);
        }

        [Fact]
        public void Visit_Appends_Section_Command()
        {
            var page = new Page();
            var section = page.DefaultSection;
            var pageCommandBuilder = new List<byte>();
            var sectionCommandBuilder = new List<byte>();
            section.Visit(sectionCommandBuilder);

            page.Visit(pageCommandBuilder);

            Assert.NotNull(pageCommandBuilder);
            var sectionCommandRaw = new byte[sectionCommandBuilder.Count];
            Array.Copy(pageCommandBuilder.ToArray(), 0, sectionCommandRaw, 0, sectionCommandBuilder.Count);

            Assert.Equal(sectionCommandBuilder, sectionCommandRaw);
        }

        [Fact]
        public void Visit_Appends_All_Sections_Command()
        {
            var page = new Page();
            var defaultSection = page.DefaultSection;
            var section2 = page.CreateSection();
            var pageCommandBuilder = new List<byte>();
            var defaultSectionCommandBuilder = new List<byte>();
            var section2CommandBuilder = new List<byte>();
            defaultSection.Visit(defaultSectionCommandBuilder);
            section2.Visit(section2CommandBuilder);

            page.Visit(pageCommandBuilder);

            Assert.NotNull(pageCommandBuilder);
            var defaultSectionCommandRaw = new byte[defaultSectionCommandBuilder.Count];
            var section2CommandRaw = new byte[section2CommandBuilder.Count];
            Array.Copy(pageCommandBuilder.ToArray(), 0, section2CommandRaw, 0, section2CommandBuilder.Count);
            Array.Copy(pageCommandBuilder.ToArray(), section2CommandBuilder.Count, defaultSectionCommandRaw, 0, defaultSectionCommandBuilder.Count);
            Assert.Equal(defaultSectionCommandBuilder, defaultSectionCommandRaw);
            Assert.Equal(section2CommandBuilder, section2CommandRaw);
        }

        [Fact]
        public void Visit_Throws_If_Null()
        {
            var element = new Page();

            var exception = Assert.Throws<ArgumentNullException>(() => element.Visit(null));
            Assert.Equal("commandBuilder", exception.ParamName);
        }
    }
}
