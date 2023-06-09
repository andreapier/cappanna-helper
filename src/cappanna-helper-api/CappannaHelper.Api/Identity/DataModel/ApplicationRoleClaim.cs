﻿using Microsoft.AspNetCore.Identity;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationRoleClaim : IdentityRoleClaim<int>
    {
        public const string CLAIM_VALUE_ADMIN = "admin";
        public const string CLAIM_VALUE_WAITER = "waiter";
        public const string CLAIM_VALUE_DOME = "dome";
        public const string CLAIM_VALUE_CASHIER = "cashier";
    }
}
