namespace CappannaHelper.Common.Auth;

public static class AuthConstants
{
    public const string POLICY_PREFIX = "Policy_Scope_";

    public static string GetPolicyNameFromScope(string scope)
    {
        return $"{POLICY_PREFIX}{scope}";
    }
}
