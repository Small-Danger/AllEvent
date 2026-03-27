<?php

namespace App\Services\Media;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class CloudinaryService
{
    public function uploadImage(UploadedFile $file, string $folder): array
    {
        $config = $this->config();
        $timestamp = time();
        $paramsToSign = [
            'folder' => $folder,
            'timestamp' => $timestamp,
        ];

        $signature = $this->sign($paramsToSign, $config['api_secret']);

        $response = Http::asMultipart()
            ->attach('file', fopen($file->getRealPath(), 'r'), $file->getClientOriginalName())
            ->post("https://api.cloudinary.com/v1_1/{$config['cloud_name']}/image/upload", [
                'api_key' => $config['api_key'],
                'timestamp' => $timestamp,
                'folder' => $folder,
                'signature' => $signature,
            ]);

        if (! $response->successful()) {
            throw new RuntimeException('Echec upload Cloudinary: '.$response->body());
        }

        return $response->json();
    }

    public function destroyImage(string $publicId): void
    {
        if ($publicId === '') {
            return;
        }

        $config = $this->config();
        $timestamp = time();
        $paramsToSign = [
            'public_id' => $publicId,
            'timestamp' => $timestamp,
        ];
        $signature = $this->sign($paramsToSign, $config['api_secret']);

        Http::asForm()->post("https://api.cloudinary.com/v1_1/{$config['cloud_name']}/image/destroy", [
            'api_key' => $config['api_key'],
            'public_id' => $publicId,
            'timestamp' => $timestamp,
            'signature' => $signature,
        ]);
    }

    private function config(): array
    {
        $cloudName = env('CLOUDINARY_CLOUD_NAME');
        $apiKey = env('CLOUDINARY_API_KEY');
        $apiSecret = env('CLOUDINARY_API_SECRET');

        if (! $cloudName || ! $apiKey || ! $apiSecret) {
            throw new RuntimeException('Configuration Cloudinary incomplète.');
        }

        return [
            'cloud_name' => $cloudName,
            'api_key' => $apiKey,
            'api_secret' => $apiSecret,
        ];
    }

    private function sign(array $params, string $apiSecret): string
    {
        ksort($params);
        $toSign = urldecode(http_build_query($params));

        return sha1($toSign.$apiSecret);
    }
}
