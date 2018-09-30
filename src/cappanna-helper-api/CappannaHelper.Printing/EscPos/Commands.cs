using System.Collections.Generic;

namespace CappannaHelper.Printing.EscPos
{
    public static class Commands
    {
        public static readonly IReadOnlyList<byte> CPI_0 = new byte[] { 0x1B, 0xC1, 0x00 };
        public static readonly IReadOnlyList<byte> CUT_FULL = new byte[] { 0x1B, 0x69 };
        public static readonly IReadOnlyList<byte> CUT_PARTIAL = new byte[] { 0x1B, 0x6D };
        public static readonly IReadOnlyList<byte> INITIALIZE_PRINTER = new byte[] { 0x1B, 0x40 };
        public static readonly IReadOnlyList<byte> LINE_FEED = new byte[] { 0x0A };
        public static readonly IReadOnlyList<byte> PRINT_AND_LINE_FEED = new byte[] { 0x1B, 0x64 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_USA_AND_EUROPE = new byte[] { 0x1B, 0x74, 0x00 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_KATAKANA = new byte[] { 0x1B, 0x74, 0x01 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_MULTILINGUAL = new byte[] { 0x1B, 0x74, 0x02 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_PORTUGUESE = new byte[] { 0x1B, 0x74, 0x03 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_CANADA_AND_FRENCH = new byte[] { 0x1B, 0x74, 0x04 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_NORDIC = new byte[] { 0x1B, 0x74, 0x05 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_CYRILLIC_2 = new byte[] { 0x1B, 0x74, 0x11 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_EURO = new byte[] { 0x1B, 0x74, 0x13 };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_CODE_TABLE_SPACE_PAGE = new byte[] { 0x1B, 0x74, 0xFF };
        public static readonly IReadOnlyList<byte> SELECT_CHARACTER_SIZE_HEADER = new byte[] { 0x1D, 0x21 };
        public static readonly IReadOnlyList<byte> SELECT_JUSTIFICATION_LEFT = new byte[] { 0x1B, 0x61, 0x00 };
        public static readonly IReadOnlyList<byte> SELECT_JUSTIFICATION_CENTER = new byte[] { 0x1B, 0x61, 0x01 };
        public static readonly IReadOnlyList<byte> SELECT_JUSTIFICATION_RIGHT = new byte[] { 0x1B, 0x61, 0x02 };
        public static readonly IReadOnlyList<byte> SELECT_PRINT_MODE_HEADER = new byte[] { 0x1B, 0x21 };
        public static readonly IReadOnlyList<byte> TURN_90_CLOCKWISE_ROTATION_OFF = new byte[] { 0x1B, 0x56, 0x00 };
        public static readonly IReadOnlyList<byte> TURN_90_CLOCKWISE_ROTATION_ON = new byte[] { 0x1B, 0x56, 0x01 };
        public static readonly IReadOnlyList<byte> TRANSMIT_PRINTER_STATUS = new byte[] { 0x10, 0x04, 0x01 };
        public static readonly IReadOnlyList<byte> TRANSMIT_OFFLINE_STATUS = new byte[] { 0x10, 0x04, 0x02 };
        public static readonly IReadOnlyList<byte> TRANSMIT_ERROR_STATUS = new byte[] { 0x10, 0x04, 0x03 };
        public static readonly IReadOnlyList<byte> TRANSMIT_ROLL_PAPER_SENSOR_STATUS = new byte[] { 0x10, 0x04, 0x04 };
        public static readonly IReadOnlyList<byte> TRANSMIT_INK_A_STATUS = new byte[] { 0x10, 0x04, 0x07, 0x01 };
        public static readonly IReadOnlyList<byte> TRANSMIT_INK_B_STATUS = new byte[] { 0x10, 0x04, 0x07, 0x02 };
        public static readonly IReadOnlyList<byte> TRANSMIT_PEELER_STATUS = new byte[] { 0x10, 0x04, 0x08, 0x03 };
        public static readonly IReadOnlyList<byte> TRANSMIT_INTERFACE_STATUS = new byte[] { 0x10, 0x04, 0x12, 0x01 };
        public static readonly IReadOnlyList<byte> TRANSMIT_DMD_STATUS = new byte[] { 0x10, 0x04, 0x12, 0x02 };
    };
}
