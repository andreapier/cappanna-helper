using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Migrations
{
    public abstract class BaseSeedMigration : Migration
    {
        private readonly DbContextOptions _options;

        protected DbContextOptions Options { get { return _options; } }

        protected BaseSeedMigration()
        {
            _options = new DbContextOptionsBuilder().UseSqlite("Data Source=Persistence\\CappannaHelper.db").Options;
        }
    }
}
