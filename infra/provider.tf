# main.tf

# Configure the AWS provider
provider "aws" {
  region = "us-east-1" # Change this if needed
}

# Create an S3 bucket
resource "aws_s3_bucket" "static_site" {
  bucket = "my-static-site-hitesh" # Make this unique!
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags = {
    Name        = "MyStaticWebsiteBucket"
    Environment = "Dev"
  }
}

# Bucket policy to allow public read
resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.static_site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.static_site.arn}/*"
      }
    ]
  })
}

# Output the website endpoint
output "website_url" {
  value = aws_s3_bucket.static_site.website_endpoint
}
