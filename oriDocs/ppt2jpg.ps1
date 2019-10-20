param (
   [boolean]$singleSlide = $false,
   [string]$pptFile,
   [int]$slide,
   [string]$outputName
)

#ppt2jpg.ps1 -singleSlide $True -pptFile "c:\hallo ppt" -slide 1 -outputName "test"

#write-output $singleSlide;
#write-output $pptFile;
#write-output $slide;
#write-output $outputName;


# Powershell script to export Powerpoint slides as jpg images using the Powerpoint COM API

#set-executionpolicy remotesigned

#Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force;

function Export-Presentation($inputFile, $outputFolder)
{
	# Load Powerpoint Interop Assembly
	[Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Powerpoint") > $null
	[Reflection.Assembly]::LoadWithPartialname("Office") > $null

	$msoFalse =  [Microsoft.Office.Core.MsoTristate]::msoFalse
	$msoTrue =  [Microsoft.Office.Core.MsoTristate]::msoTrue

	# start Powerpoint
	#$application = New-Object "Microsoft.Office.Interop.Powerpoint.ApplicationClass" 

    $application = new-object -com powerpoint.application

	# Make sure inputFile is an absolte path
	$inputFile = Resolve-Path $inputFile
   
	$presentation = $application.Presentations.Open($inputFile, $msoTrue, $msoFalse, $msoFalse)

    $presentation.Export($outputFolder, "JPG", 1600) # => alle Slides - width & height optional
	
	$presentation.Close()
	$presentation = $null
	
	if($application.Windows.Count -eq 0)
	{
		$application.Quit()
	}
	
	$application = $null
	
	# Make sure references to COM objects are released, otherwise powerpoint might not close
	# (calling the methods twice is intentional, see https://msdn.microsoft.com/en-us/library/aa679807(office.11).aspx#officeinteroperabilitych2_part2_gc)
	[System.GC]::Collect();
	[System.GC]::WaitForPendingFinalizers();
	[System.GC]::Collect();
	[System.GC]::WaitForPendingFinalizers();       
}

function Export-Slide($inputFile, $slideNumber, $outputFile)
{
    Write-Host $inputFile
	# Load Powerpoint Interop Assembly
	[Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Powerpoint") > $null
	[Reflection.Assembly]::LoadWithPartialname("Office") > $null

	$msoFalse =  [Microsoft.Office.Core.MsoTristate]::msoFalse
	$msoTrue =  [Microsoft.Office.Core.MsoTristate]::msoTrue

	# start Powerpoint
	#$application = New-Object "Microsoft.Office.Interop.Powerpoint.ApplicationClass" 

    $application = new-object -com powerpoint.application

	# Make sure inputFile is an absolte path
	$inputFile = Resolve-Path $inputFile
   
	$presentation = $application.Presentations.Open($inputFile, $msoTrue, $msoFalse, $msoFalse)

	$slide = $presentation.Slides.Item($slideNumber)
	$slide.Export($outputFile, "JPG", 1600)
	
	$slide = $null
	
	$presentation.Close()
	$presentation = $null
	
	if($application.Windows.Count -eq 0)
	{
		$application.Quit()
	}
	
	$application = $null
	
	# Make sure references to COM objects are released, otherwise powerpoint might not close
	# (calling the methods twice is intentional, see https://msdn.microsoft.com/en-us/library/aa679807(office.11).aspx#officeinteroperabilitych2_part2_gc)
	[System.GC]::Collect();
	[System.GC]::WaitForPendingFinalizers();
	[System.GC]::Collect();
	[System.GC]::WaitForPendingFinalizers();       
}

if ($singleSlide) {
    Export-Slide $pptFile $slide $outputName;
}
else {
    Export-Presentation $pptFile $outputName;
} 

#Export-Presentation "C:\git\MkDocs\moba\oriDocs\Architektur.pptx" "C:\git\MkDocs\moba\oriDocs\Architektur";
#Export-Slide "C:\git\MkDocs\moba\oriDocs\Architektur.pptx" 1 "C:\git\MkDocs\moba\oriDocs\A1.jpg";

