using System;
using System.Collections.Generic;

namespace CappannaHelper.Printing.EscPos
{
    public class Section : Element, ISection
    {
        private readonly List<Element> _elements;

        public bool Bold { get; set; }
        public HorizontalAlignments HorizontalAlignment { get; set; }
        public bool Italic { get; set; }
        public Rotations Rotation { get; set; }
        public int Size { get; private set; }
        public bool Underline { get; set; }

        public Section()
        {
            _elements = new List<Element>();
            HorizontalAlignment = HorizontalAlignments.Left;
            Rotation = Rotations.Rotation_0;
            Size = 15;
        }

        public ILabel CreateLabel()
        {
            var result = new Label();
            _elements.Add(result);

            return result;
        }

        public void NewLine()
        {
            var result = new NewLine();
            _elements.Add(result);
        }

        public void SetSize(int size)
        {
            if (size <= 0)
            {
                //TODO: Do not hardcode string resources
                throw new ArgumentException("Size must be positive", nameof(size));
            }

            Size = size;
        }

        protected override void VisitInner(List<byte> commandBuilder)
        {
            commandBuilder.AddRange(GetRotationSelectionValue());
            commandBuilder.AddRange(Commands.SELECT_PRINT_MODE_HEADER);
            commandBuilder.Add(GetPrintModeSelectionValue());
            commandBuilder.AddRange(Commands.SELECT_CHARACTER_SIZE_HEADER);
            commandBuilder.Add(GetCharacterSizeSelectionValue());
            commandBuilder.AddRange(GetJustificationSelectionValue());

            foreach (var element in _elements)
            {
                element.Visit(commandBuilder);
            }
        }

        private IEnumerable<byte> GetJustificationSelectionValue()
        {
            switch(HorizontalAlignment)
            {
                case HorizontalAlignments.Center:
                    return Commands.SELECT_JUSTIFICATION_CENTER;

                case HorizontalAlignments.Right:
                    return Commands.SELECT_JUSTIFICATION_RIGHT;

                default:
                    return Commands.SELECT_JUSTIFICATION_LEFT;
            }
        }

        private IEnumerable<byte> GetRotationSelectionValue()
        {
            return Rotation == Rotations.Rotation_0 || Rotation == Rotations.Rotation_180
                ? Commands.TURN_90_CLOCKWISE_ROTATION_OFF
                : Commands.TURN_90_CLOCKWISE_ROTATION_ON;
        }

        private byte GetPrintModeSelectionValue()
        {
            byte mode = 0x01;

            if (Bold)
            {
                mode |= 0x08;
            }

            if (Underline)
            {
                mode |= 0x80;
            }

            if (Italic)
            {
                mode |= 0x40;
            }

            return mode;
        }

        private byte GetCharacterSizeSelectionValue()
        {
            //TODO: Do not hardcode font size
            if (Size < 12)
            {
                return 0x00;
            }

            if (Size < 16)
            {
                return 0x10;
            }

            if (Size < 24)
            {
                return 0x11;
            }

            if (Size < 32)
            {
                return 0x22;
            }

            return 0x33;
        }
    }
}
