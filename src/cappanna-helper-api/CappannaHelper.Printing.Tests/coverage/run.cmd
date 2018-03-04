@ECHO off

SET opencover=%USERPROFILE%/.nuget/packages/OpenCover/4.6.519/tools/OpenCover.Console.exe
SET reportgenerator=%USERPROFILE%/.nuget/packages/ReportGenerator/3.0.2/tools/ReportGenerator.exe
SET targetargs="test .."
SET filter="+[CappannaHelper.Printing]*.* -[CappannaHelper.Printing.Tests]* -[xunit.*]* -[Moq]*"
SET coveragedir=coverage/reporting
SET coveragefile=Coverage.xml

%opencover% -oldStyle -register:user -target:dotnet.exe -output:%coveragefile% -targetargs:%targetargs% -filter:%filter% -skipautoprops -hideskipped:All
%reportgenerator% -targetdir:%coveragedir% -reporttypes:Html;Badges -reports:%coveragefile% -verbosity:Error

START "report" "%coveragedir%\index.htm"
