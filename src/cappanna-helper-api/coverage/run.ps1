dotnet test `
	/p:CollectCoverage=true `
	/p:CoverletOutput="./../coverage/" `
	/p:Exclude="[xunit.*]*%2c[*]*Tests*" `
	./CappannaHelper.Printing.Tests/CappannaHelper.Printing.Tests.csproj

dotnet test `
	/p:CollectCoverage=true `
	/p:MergeWith="./../coverage/coverage.json" `
	/p:CoverletOutput="./../coverage/" `
	/p:CoverletOutputFormat=opencover `
	/p:Exclude="[xunit.*]*%2c[*]*Tests*" `
	./CappannaHelper.Api.Tests/CappannaHelper.Api.Tests.csproj

reportgenerator "-reports:coverage\coverage.opencover.xml" "-targetdir:coverage\report" "-verbosity:Error"

explorer .\coverage\report\index.htm