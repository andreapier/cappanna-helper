namespace CappannaHelper.Printing.EscPos {
    public class StatusFactory:IStatusFactory
    {
        public IStatus Create()
        {
            return new Status();
        }
    }
}
