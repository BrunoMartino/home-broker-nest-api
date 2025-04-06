import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetPresenter } from './asset.presenter';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    const asset = await this.assetsService.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset) => new AssetPresenter(asset));
    //precisar criar respostas quando não existir
  }

  @Get(':symbol')
  async findOne(@Param('symbol') symbol: string) {
    const asset = await this.assetsService.findOne(symbol);
    return new AssetPresenter(asset!);
    //precisar criar respostas quando symbol não existe
  }

  // precisa criar funções de update e delete
}
