$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$buildDir = Join-Path $root "build"
$sourceLogo = Join-Path $root "renderer\assets\logo.png"

if (-not (Test-Path $sourceLogo)) {
  throw "Missing launcher logo: $sourceLogo"
}

New-Item -ItemType Directory -Force -Path $buildDir | Out-Null
Add-Type -AssemblyName System.Drawing

function New-IconFrameFromSource {
  param(
    [System.Drawing.Image]$Source,
    [string]$Path,
    [int]$Size
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $target = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
  $graphics.DrawImage($Source, $target)
  $graphics.Dispose()
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

function Write-IconFile {
  param(
    [string]$IcoPath,
    [string[]]$PngPaths
  )

  $stream = [System.IO.File]::Create($IcoPath)
  $writer = New-Object System.IO.BinaryWriter $stream
  $writer.Write([UInt16]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]$PngPaths.Count)
  $offset = 6 + (16 * $PngPaths.Count)
  $pngData = @()

  foreach ($png in $PngPaths) {
    $bytes = [System.IO.File]::ReadAllBytes($png)
    $pngData += ,$bytes
    $image = [System.Drawing.Image]::FromFile($png)
    $width = if ($image.Width -ge 256) { 0 } else { [byte]$image.Width }
    $height = if ($image.Height -ge 256) { 0 } else { [byte]$image.Height }
    $image.Dispose()

    $writer.Write([byte]$width)
    $writer.Write([byte]$height)
    $writer.Write([byte]0)
    $writer.Write([byte]0)
    $writer.Write([UInt16]1)
    $writer.Write([UInt16]32)
    $writer.Write([UInt32]$bytes.Length)
    $writer.Write([UInt32]$offset)
    $offset += $bytes.Length
  }

  foreach ($bytes in $pngData) {
    $writer.Write($bytes)
  }

  $writer.Dispose()
  $stream.Dispose()
}

$sizes = @(16, 24, 32, 48, 64, 128, 256)
$pngs = @()
$sourceImage = [System.Drawing.Image]::FromFile($sourceLogo)

foreach ($size in $sizes) {
  $png = Join-Path $buildDir "icon-$size.png"
  New-IconFrameFromSource -Source $sourceImage -Path $png -Size $size
  $pngs += $png
}

$sourceImage.Dispose()
Write-IconFile -IcoPath (Join-Path $buildDir "icon.ico") -PngPaths $pngs

Write-Host "Generated build/icon.ico from renderer/assets/logo.png."
