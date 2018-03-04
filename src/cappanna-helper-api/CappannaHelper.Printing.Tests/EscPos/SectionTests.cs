using CappannaHelper.Printing.EscPos;
using System;
using System.Collections.Generic;
using Xunit;

namespace CappannaHelper.Printing.Tests.EscPos
{
    public class SectionTests
    {
        [Fact]
        public void Has_Sane_Default_Values()
        {
            var section = new Section();

            Assert.False(section.Bold);
            Assert.Equal(HorizontalAlignments.Left, section.HorizontalAlignment);
            Assert.False(section.Italic);
            Assert.Equal(Rotations.Rotation_0, section.Rotation);
            Assert.Equal(15, section.Size);
            Assert.False(section.Underline);
        }

        [Fact]
        public void Can_Create_Label()
        {
            var section = new Section();

            var label = section.CreateLabel();

            Assert.NotNull(label);
        }

        [Fact]
        public void Creates_Different_Labels()
        {
            var section = new Section();

            var label1 = section.CreateLabel();
            var label2 = section.CreateLabel();

            Assert.NotNull(label1);
            Assert.NotNull(label2);
            Assert.NotEqual(label1, label2);
        }

        [Fact]
        public void Can_Create_NewLine()
        {
            var section = new Section();

            section.NewLine();
        }

        [Theory]
        [InlineData(15)]
        [InlineData(16)]
        [InlineData(24)]
        [InlineData(32)]
        public void Sets_Size_If_Greater_Than_0(int size)
        {
            var section = new Section();

            section.SetSize(size);

            Assert.Equal(size, section.Size);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void Set_Size_Throws_If_Less_Than_Or_Equal_0(int size)
        {
            var section = new Section();

            var exception = Assert.Throws<ArgumentException>(() => section.SetSize(size));
            Assert.StartsWith("Size must be positive", exception.Message);
            Assert.Equal("size", exception.ParamName);
        }

        [Fact]
        public void Visit_Throws_If_Null()
        {
            var element = new Section();

            var exception = Assert.Throws<ArgumentNullException>(() => element.Visit(null));
            Assert.Equal("commandBuilder", exception.ParamName);
        }

        [Fact]
        public void Visit_Appends_Elements_Command()
        {
            var section = new Section();
            var label1 = section.CreateLabel();
            var label2 = section.CreateLabel();
            var content1 = "test1";
            var content2 = "test2";
            var sectionCommandBuilder = new List<byte>();
            var label1CommandBuilder = new List<byte>();
            var label2CommandBuilder = new List<byte>();
            label1.SetContent(content1);
            label2.SetContent(content2);
            label1.Visit(label1CommandBuilder);
            label2.Visit(label2CommandBuilder);

            section.Visit(sectionCommandBuilder);

            var content1Raw = new byte[label1CommandBuilder.Count];
            var content2Raw = new byte[label2CommandBuilder.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), sectionCommandBuilder.Count - label1CommandBuilder.Count - label2CommandBuilder.Count, content1Raw, 0, label1CommandBuilder.Count);
            Array.Copy(sectionCommandBuilder.ToArray(), sectionCommandBuilder.Count - label2CommandBuilder.Count, content2Raw, 0, label2CommandBuilder.Count);
            Assert.Equal(label1CommandBuilder, content1Raw);
            Assert.Equal(label2CommandBuilder, content2Raw);
        }

        [Theory]
        [InlineData(Rotations.Rotation_0)]
        [InlineData(Rotations.Rotation_180)]
        public void Visit_Appends_Rotation_Off_Command(Rotations rotation)
        {
            var section = new Section();
            section.Rotation = rotation;
            var sectionCommandBuilder = new List<byte>();

            section.Visit(sectionCommandBuilder);

            var rotateCommand = new byte[Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), 0, rotateCommand, 0, rotateCommand.Length);
            Assert.Equal(Commands.TURN_90_CLOCKWISE_ROTATION_OFF, rotateCommand);
        }

        [Theory]
        [InlineData(Rotations.Rotation_90)]
        [InlineData(Rotations.Rotation_270)]
        public void Visit_Appends_Rotation_On_Command(Rotations rotation)
        {
            var section = new Section();
            section.Rotation = rotation;
            var sectionCommandBuilder = new List<byte>();

            section.Visit(sectionCommandBuilder);

            var rotateCommand = new byte[Commands.TURN_90_CLOCKWISE_ROTATION_ON.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), 0, rotateCommand, 0, rotateCommand.Length);
            Assert.Equal(Commands.TURN_90_CLOCKWISE_ROTATION_ON, rotateCommand);
        }

        [Theory]
        [InlineData(false, false, false)]
        [InlineData(false, false, true)]
        [InlineData(false, true, false)]
        [InlineData(false, true, true)]
        [InlineData(true, false, false)]
        [InlineData(true, false, true)]
        [InlineData(true, true, false)]
        [InlineData(true, true, true)]
        public void Visit_Appends_Font_Properties_Command(bool bold, bool underline, bool italic)
        {
            var section = new Section();
            section.Bold = bold;
            section.Underline = underline;
            section.Italic = italic;
            var sectionCommandBuilder = new List<byte>();
            var expected = 0x01 | (bold ? 0x08 : 00) | (underline ? 0x80 : 0x00) | (italic ? 0x40 : 0x00);

            section.Visit(sectionCommandBuilder);

            var selectPrintMode = new byte[Commands.SELECT_PRINT_MODE_HEADER.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count, selectPrintMode, 0, selectPrintMode.Length);
            Assert.Equal(Commands.SELECT_PRINT_MODE_HEADER, selectPrintMode);
            Assert.Equal(expected, sectionCommandBuilder[Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count + Commands.SELECT_PRINT_MODE_HEADER.Count]);
        }

        [Theory]
        [InlineData(15)]
        [InlineData(16)]
        [InlineData(24)]
        [InlineData(32)]
        public void Visit_Appends_Size_Command(int size)
        {
            var section = new Section();
            section.SetSize(size);
            var sectionCommandBuilder = new List<byte>();
            var expected = size < 16 ? 0x00
                : size >= 16 && size < 24 ? 0x11
                : size >= 24 && size < 32 ? 0x22
                : 0x33;

            section.Visit(sectionCommandBuilder);

            var sizeCommand = new byte[Commands.SELECT_CHARACTER_SIZE_HEADER.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count + Commands.SELECT_PRINT_MODE_HEADER.Count + 1, sizeCommand, 0, sizeCommand.Length);
            Assert.Equal(Commands.SELECT_CHARACTER_SIZE_HEADER, sizeCommand);
            Assert.Equal(expected, sectionCommandBuilder[Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count + Commands.SELECT_PRINT_MODE_HEADER.Count + Commands.SELECT_CHARACTER_SIZE_HEADER.Count + 1]);
        }

        [Theory]
        [InlineData(HorizontalAlignments.Left)]
        [InlineData(HorizontalAlignments.Center)]
        [InlineData(HorizontalAlignments.Right)]
        public void Visit_Appends_Justification_Command(HorizontalAlignments alignment)
        {
            var section = new Section();
            section.HorizontalAlignment = alignment;
            var sectionCommandBuilder = new List<byte>();
            var expected = alignment == HorizontalAlignments.Left ? Commands.SELECT_JUSTIFICATION_LEFT
                : alignment == HorizontalAlignments.Center ? Commands.SELECT_JUSTIFICATION_CENTER
                : Commands.SELECT_JUSTIFICATION_RIGHT;

            section.Visit(sectionCommandBuilder);

            var justificationCommand = new byte[Commands.SELECT_JUSTIFICATION_CENTER.Count];
            Array.Copy(sectionCommandBuilder.ToArray(), Commands.TURN_90_CLOCKWISE_ROTATION_OFF.Count + Commands.SELECT_PRINT_MODE_HEADER.Count + 1 + Commands.SELECT_CHARACTER_SIZE_HEADER.Count + 1, justificationCommand, 0, justificationCommand.Length);
            Assert.Equal(expected, justificationCommand);
        }
    }
}
